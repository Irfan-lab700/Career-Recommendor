import random
import csv

careers = {
    "Software Developer":   [5,2,1,1,4,3,2,2,1,2],
    "Web Developer":        [3,2,1,1,5,2,2,5,1,3],
    "Data Scientist":       [3,5,1,1,2,4,5,2,1,1],
    "AI/ML Engineer":       [4,5,1,1,3,5,4,1,1,2],
    "UI/UX Designer":       [1,1,1,1,3,1,2,5,1,2],
    "Electronics Engineer": [2,3,4,5,1,1,1,1,1,1],
    "Robotics Engineer":    [3,3,5,4,2,3,2,1,1,2],
    "Cybersecurity Engineer":[4,3,1,2,4,2,1,1,5,1],
    "Game Developer":       [3,2,1,1,4,2,1,4,1,5],
}

def add_noise(val):
    noise = random.choice([-2, -1, -1, 0, 0, 0, 0, 1, 1, 2])
    return max(1, min(5, val + noise))

rows = []
for career, base in careers.items():
    for _ in range(350):
        row = [add_noise(v) for v in base]
        
        for j in range(len(row)):
            if random.random() < 0.10:
                row[j] = random.randint(1, 5)
        
        row.append(career)
        rows.append(row)

random.shuffle(rows)

with open("data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow([f"q{i}" for i in range(1, 11)] + ["career"])
    writer.writerows(rows)
