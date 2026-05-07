import os
from dotenv import load_dotenv
from groq import Groq
import json

load_dotenv()

client = Groq(api_key=os.getenv("api_key"))
def generate_llm_output(career, answers):

    prompt = f"""
    You are an expert career mentor and software engineering roadmap planner.

    CRITICAL INSTRUCTIONS:
    - Return ONLY valid JSON.
    - Do NOT include explanations, markdown, or extra text.
    - Do NOT use separators or bullet formatting.
    - Give proper useful skills(technical-skills( like python javascript not communcation or problem solving)), tools and roadmap.
    - Roadmap must be ONLY for 3 months.
    INPUT:
    Career: {career}
    Quiz Answers: {answers}

    OUTPUT FORMAT (STRICT JSON ONLY):

    {{
    "reason": "Explain in 2-3 simple sentences why this career fits the user based on quiz answers.",
    "roadmap": {{
    "month_1": [
      "Task 1",
      "Task 2",
      "Task 3"
    ],
    "month_2": [
      "Task 1",
      "Task 2",
      "Task 3"
    ],
    "month_3": [
      "Task 1",
      "Task 2",
      "Task 3"
    ]
  }},

  "skills_required": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ],

  "tools": [
    "Tool 1",
    "Tool 2",
    "Tool 3"
  ]
  }}
  """

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "Return ONLY valid JSON. No extra text."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        
        return json.loads(response.choices[0].message.content)

    except Exception as e:
      return {
        "error": str(e)
    }


def analyze_resume_llm(resume_text):

    prompt = f"""
    You are an expert ATS resume analyzer and career advisor.

    CRITICAL INSTRUCTIONS:
    - Return ONLY valid JSON.
    - Do NOT include any explanation, markdown, or extra text.
    - Do NOT use separators, bullets, or formatting symbols.
    - Every point MUST be a meaningful bullet point  (not 1–2 words).
    - Avoid vague or generic phrases.
    - Be strict, precise, and realistic like a senior recruiter.
    ANALYSIS RULES:
    - Strengths must describe real skills or achievements clearly.
    - Weaknesses must describe real gaps or missing experience clearly.
    - Missing skills must be relevant to the candidate’s career domain.
    - Improvements must be actionable and practical.
    - Do NOT overexaggerate strengths or weaknesses( don't write in strengths if no proof shown  ). Be balanced and honest.
    -Be strict. Do not exaggerate. Only describe what is clearly present in resume and write strong only if proofs exist. Avoid words like expert, strong, proficient unless explicitly proven.
    - Dont use speicific skills in strengths if no clear proof or project experience .only write actual strenghts if proof exists. 
    OUTPUT FORMAT (STRICT JSON ONLY):

   {{
  "top_careers": [
    "Career 1",
    "Career 2",
    "Career 3"
  ],
  "strengths": [
    "strength point 1",
    "strength point 2",
    "strength point 3"
  ],
  "weaknesses": [
    "Weakness point 1",
    "Weakness point 2",
    "Weakness point 3"
  ],
  "missing_skills": [
    "Complete missing skill explanation 1",
    "Complete missing skill explanation 2",
    "Complete missing skill explanation 3"
  ],
  "improvements": [
    "Actionable improvement point 1",
    "Actionable improvement point 2",
    "Actionable improvement point 3"
  ]
}}

   Resume:
  {resume_text}
  """

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are a strict ATS resume analyzer. Return ONLY valid JSON. No explanation. No markdown."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content

        return json.loads(content)

    except Exception as e:
        return {
          "error": str(e)

        }