from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from llm import generate_llm_output, analyze_resume_llm
from ml import predict_career
from fastapi import UploadFile, File
import pdfplumber
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuizInput(BaseModel):
    q1: int
    q2: int
    q3: int
    q4: int
    q5: int
    q6: int
    q7: int
    q8: int
    q9: int
    q10: int


@app.post("/predict")
def predict(data: QuizInput):
    answers = [
        data.q1, data.q2, data.q3, data.q4, data.q5,
        data.q6, data.q7, data.q8, data.q9, data.q10
    ]
    try:
        career = predict_career(answers)
        llm_output = generate_llm_output(career, answers)
        return {
            "career": career,
            "llm_output": llm_output,
            "error": False
        }
    except Exception as e:
        return {
            "career": ["Unknown", 0],
            "llm_output": "AI temporarily unavailable. Please try again.",
            "error": True,
            "message": str(e)
        }


@app.post("/analyze_resume")
def analyze_resume(file: UploadFile = File(...)):
    try:
        raw_text = ""
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    raw_text += page_text + "\n"

        analysis = analyze_resume_llm(raw_text)
        skills = extract_skills(raw_text)
        sections = detect_sections(raw_text)
        score = calculate_ats_score(sections, skills)

        return {
            "analysis": analysis,
            "skills": skills,
            "ats_score": score,
            "error": False
        }

    except Exception as e:
        return {
            "analysis": "AI analysis unavailable.",
            "skills": [],
            "ats_score": 0,
            "error": True,
            "message": str(e)
        }


def normalize_text(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\+\#\.\:\-\/\@ \n]", " ", text) 
    text = re.sub(r" +", " ", text)
    return text.strip()

def is_skill_present(skill, text):
    pattern = r'(?<![a-zA-Z])' + re.escape(skill.lower()) + r'(?![a-zA-Z])'
    return bool(re.search(pattern, text))


def extract_skills(text):
    normalized = normalize_text(text)

    skills_list = [
        "python", "java", "javascript", "c", "c++", "typescript",
        "react", "node.js", "express", "django", "flask", "fastapi",
        "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
        "sql", "mongodb", "postgresql", "firebase", "redis",
        "docker", "kubernetes", "git", "github", "linux",
        "html", "css", "nextjs", "vuejs", "angular",
        "aws", "azure", "gcp", "pandas", "numpy", "streamlit"
    ]

    found_skills = []
    for skill in skills_list:
        if is_skill_present(skill, normalized):
            found_skills.append(skill)

    return list(set(found_skills))

def detect_sections(text):
    sections = {
        "skills": [],
        "experience": [],
        "education": [],
        "projects": [],
        "certifications": [],
        "links": []
    }

    
    lines = text.lower().split("\n")
    current_section = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if re.search(r"github\.com|linkedin\.com|portfolio|vercel\.app|netlify\.app|github\.io", line):
            sections["links"].append(line)
            
        if line == "projects":
         current_section = "projects"
        elif line == "skills":
         current_section = "skills"
        elif line == "certifications":
         current_section = "certifications"
        elif line.startswith("education"):
         current_section = "education"
        elif line == "experience" or "intern" in line:
         current_section = "experience"
        elif "about me" in line:
         current_section = None  

        if current_section:
            sections[current_section].append(line)

    return sections

def calculate_ats_score(sections, skills_found):

    score = 0
    breakdown = {}

    core_skills = [
        "python", "java", "javascript", "html", "css", "c", "c++",
        "typescript", "react", "node.js", "express", "django", "flask", "fastapi"
    ]
    advanced_skills = [
        "aws", "azure", "gcp", "deep learning", "docker",
        "kubernetes", "tensorflow", "pytorch", "scikit-learn"
    ]

    skill_score = 0
    for skill in skills_found:
        if skill in advanced_skills:
            skill_score += 4
        elif skill in core_skills:
            skill_score += 3
        else:
            skill_score += 2

    skill_score = min(skill_score, 40)
    score += skill_score
    breakdown["skills"] = skill_score

    project_text = " ".join(sections.get("projects", []))
    project_signals = re.findall(
        r"\bbuilt\b|\bdeveloped\b|\bcreated\b|\bimplemented\b|\bdesigned\b|\bdeployed\b",
        project_text
    )
    project_score = min(len(project_signals) * 4, 20)
    score += project_score
    breakdown["projects"] = project_score

    full_text = " ".join([" ".join(v) for v in sections.values()])
    quant_signals = re.findall(
        r'\d+\s*%|\d+\s*users|\d+\s*k\b|\d+\s*projects|\br2\b|\bcgpa\b|\bgpa\b|\d+\.\d+',
        full_text
    )
    quant_score = min(len(quant_signals) * 2, 10)
    score += quant_score
    breakdown["quantification"] = quant_score

    exp_text = " ".join(sections.get("experience", []))
    exp_signals = re.findall(
        r"\bintern\b|\bworked\b|\bdeveloped\b|\bengineer\b|\bcollaborated\b|\bfreelance\b",
        exp_text
    )
    exp_score = min(len(exp_signals) * 4, 10)
    score += exp_score
    breakdown["experience"] = exp_score

    edu_text = " ".join(sections.get("education", []))
    if re.search(r"\bb\.?tech\b|\bbachelor\b|\bengineering\b|\bm\.?tech\b|\bmaster\b", edu_text):
        edu_score = 5
    else:
        edu_score = 2
    score += edu_score
    breakdown["education"] = edu_score

    cert_text = " ".join(sections.get("certifications", []))
    cert_signals = re.findall(
        r"\bcertif\b|\bcoursera\b|\budemy\b|\biit\b|\binfosys\b|\bdeloitte\b|\bgoogle\b|\bmicrosoft\b|\bamazon\b",
        cert_text
    )
    cert_score = min(len(cert_signals) * 2, 5)
    score += cert_score
    breakdown["certifications"] = cert_score

    links_text = " ".join(sections.get("links", []))
    link_score = 0

    if "github.com" in links_text:
        link_score += 2
    if "linkedin.com" in links_text:
        link_score += 1
    if any(x in links_text for x in ["portfolio", "vercel", "netlify", "github.io"]):
        link_score += 2

    link_score = min(link_score, 5)
    score += link_score
    breakdown["links"] = link_score

    if len(skills_found) < 5:
        score -= 8
    if breakdown["projects"] <= 1:
        score -= 8
    if breakdown["education"] == 0:
        score -= 5

    score = max(0, min(score, 100))

    return round(score)