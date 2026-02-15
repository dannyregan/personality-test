import { useState } from "react";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';


import '../styles/test.css'

// --- Types ---
type LikertOption = "Strongly Disagree" | "Disagree" | "Neutral" | "Agree" | "Strongly Agree";
type Character = "Princess" | "Fairy" | "Witch" | "Pirate" | "Mermaid";

// Assign a color for each character
const COLORS: Record<Character, string> = {
  Princess: "#FF6B6B",
  Fairy: "#FFD93D",
  Witch: "#6BCB77",
  Pirate: "#4D96FF",
  Mermaid: "#A28089"
};

// --- Likert options and points ---
const options: LikertOption[] = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
const pointsMap: Record<LikertOption, number> = {
  "Strongly Disagree": 5,
  "Disagree": 3,
  "Neutral": 1,
  "Agree": 3,
  "Strongly Agree": 5
};

// --- Questions ---
const questions: {
  text: string;
  map: Record<LikertOption, Character[]>;
}[] = [
  {
    text: "I am a planner.",
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Fairy", "Pirate"],
      "Neutral": ["Mermaid"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: "I enjoy getting out of my comfort zone.",
    map: {
      "Strongly Disagree": ["Princess"],
      "Disagree": ["Princess", "Fairy"],
      "Neutral": ["Witch", "Fairy"],
      "Agree": ["Pirate", "Mermaid"],
      "Strongly Agree": ["Mermaid"]
    }
  },
  {
    text: "I always do my nighttime routine before bed.",
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Mermaid", "Pirate"],
      "Neutral": ["Fairy"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: "I like to travel alone.",
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Witch", "Pirate"],
      "Neutral": ["Fairy"],
      "Agree": ["Mermaid", "Princess"],
      "Strongly Agree": ["Mermaid"]
    }
  },
  {
    text: "I plan out my schedule each week.",
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Fairy", "Pirate"],
      "Neutral": ["Mermaid"],
      "Agree": ["Witch", "Princess"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: "I have an addictive personality.",
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Mermaid", "Fairy"],
      "Neutral": ["Witch"],
      "Agree": ["Princess", "Pirate"],
      "Strongly Agree": ["Pirate"]
    }
  },
  {
    text: "If I set a goal for the day, I have to accomplish it or I will be upset with myself.",
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Fairy", "Mermaid"],
      "Neutral": ["Pirate"],
      "Agree": ["Witch", "Princess"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: "I consider myself a patient person.",
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Witch", "Pirate"],
      "Neutral": ["Princess"],
      "Agree": ["Fairy", "Mermaid"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: "I like my space to be clean before I go to bed.",
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Mermaid", "Pirate"],
      "Neutral": ["Fairy"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: "I’m always early to my commitments.",
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Mermaid", "Pirate"],
      "Neutral": ["Fairy"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: "I have a crafty or creative hobby or project.",
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Witch", "Pirate"],
      "Neutral": ["Mermaid", "Witch"],
      "Agree": ["Princess", "Fairy"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: "I have thoughtfully decorated my living space.",
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Mermaid", "Pirate"],
      "Neutral": ["Witch"],
      "Agree": ["Princess", "Fairy"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: "I usually meal plan or meal prep.",
    map: {
      "Strongly Disagree": ["Pirate", "Mermaid"],
      "Disagree": ["Mermaid", "Pirate"],
      "Neutral": ["Fairy"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: "I like to track my health and activity.",
    map: {
      "Strongly Disagree": ["Mermaid", "Fairy"],
      "Disagree": ["Mermaid", "Fairy"],
      "Neutral": ["Pirate"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: "I cry more than once a month.",
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Pirate", "Witch"],
      "Neutral": ["Mermaid"],
      "Agree": ["Princess", "Fairy"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: "When I am invited to things and I am not busy, I always go.",
    map: {
      "Strongly Disagree": ["Princess"],
      "Disagree": ["Mermaid", "Princess"],
      "Neutral": ["Witch", "Mermaid"],
      "Agree": ["Pirate", "Fairy"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: "I am easily convinced.",
    map: {
      "Strongly Disagree": ["Princess"],
      "Disagree": ["Mermaid", "Princess"],
      "Neutral": ["Witch"],
      "Agree": ["Pirate", "Fairy"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: "I tend to push boundaries.",
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Fairy", "Princess"],
      "Neutral": ["Mermaid"],
      "Agree": ["Pirate", "Witch"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: "I get really bad FOMO.",
    map: {
      "Strongly Disagree": ["Princess", "Mermaid"],
      "Disagree": ["Mermaid", "Princess"],
      "Neutral": ["Fairy"],
      "Agree": ["Pirate", "Witch"],
      "Strongly Agree": ["Pirate"]
    }
  },
  {
    text: "If I stay overnight at someone’s place, I need to bring all my stuff with me.",
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Mermaid", "Pirate"],
      "Neutral": ["Fairy", "Witch"],
      "Agree": ["Princess"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: "If there is a lull in conversation, I’m going to fill it.",
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Witch", "Mermaid"],
      "Neutral": ["Fairy"],
      "Agree": ["Pirate", "Princess"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: "I consider myself detail oriented.",
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Mermaid", "Pirate"],
      "Neutral": ["Witch"],
      "Agree": ["Princess", "Fairy"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: "I would work a job I hate if it paid really well.",
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Mermaid", "Fairy"],
      "Neutral": ["Pirate", "Witch", "Mermaid"],
      "Agree": ["Princess", "Witch", "Pirate"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: "When I have some extra money I treat myself.",
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Princess", "Witch"],
      "Neutral": ["Mermaid"],
      "Agree": ["Pirate", "Fairy"],
      "Strongly Agree": ["Pirate"]
    }
  },
  {
    text: "I prefer to travel to places that are off the beaten path.",
    map: {
      "Strongly Disagree": ["Princess"],
      "Disagree": ["Princess"],
      "Neutral": ["Witch", "Fairy"],
      "Agree": ["Mermaid", "Pirate"],
      "Strongly Agree": ["Mermaid", "Pirate"]
    }
  },
  {
    text: "When I’m upset I’m more likely to get angry than to cry.",
    map: {
      "Strongly Disagree": ["Princess", "Fairy"],
      "Disagree": ["Princess", "Fairy"],
      "Neutral": ["Mermaid"],
      "Agree": ["Witch", "Pirate"],
      "Strongly Agree": ["Witch", "Pirate"]
    }
  },
  {
    text: 'When I have a problem I ask people for their opinions on what I should do.',
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Princess", "Mermaid"],
      "Neutral": ["Witch"],
      "Agree": ["Fairy", "Pirate"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: 'I fall in love easily.',
    map: {
      "Strongly Disagree": ["Pirate", "Witch"],
      "Disagree": ["Pirate", "Witch"],
      "Neutral": ["Mermaid"],
      "Agree": ["Fairy", "Princess"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: 'I consider myself confrontational.',
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Mermaid", "Fairy"],
      "Neutral": ["Princess"],
      "Agree": ["Pirate", "Witch"],
      "Strongly Agree": ["Pirate"]
    }
  },
  {
    text: 'I need my me-time.',
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Pirate", "Witch"],
      "Neutral": ["Fairy"],
      "Agree": ["Princess", "Mermaid"],
      "Strongly Agree": ["Mermaid"]
    }
  },
  {
    text: 'People describe me as independent.',
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Pirate", "Fairy"],
      "Neutral": ["Witch"],
      "Agree": ["Princess", "Mermaid"],
      "Strongly Agree": ["Mermaid"]
    }
  },
  {
    text: 'I consider myself spontaneous.',
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Witch", "Princess"],
      "Neutral": ["Fairy"],
      "Agree": ["Pirate", "Mermaid"],
      "Strongly Agree": ["Mermaid"]
    }
  },
  {
    text: 'I am bothered by mess.',
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Pirate", "Mermaid"],
      "Neutral": ["Witch"],
      "Agree": ["Princess", "Fairy"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: 'People describe me as bossy.',
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Fairy", "Mermaid"],
      "Neutral": ["Pirate"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: 'I am more driven than my friends.',
    map: {
      "Strongly Disagree": ["Fairy"],
      "Disagree": ["Fairy", "Mermaid"],
      "Neutral": ["Princess", "Mermaid"],
      "Agree": ["Pirate", "Witch"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: 'I clean more than my roommates or housemates do.',
    map: {
      "Strongly Disagree": ["Mermaid"],
      "Disagree": ["Pirate", "Mermaid"],
      "Neutral": ["Fairy"],
      "Agree": ["Princess", "Witch"],
      "Strongly Agree": ["Princess"]
    }
  },
  {
    text: 'I often find myself in leadership positions.',
    map: {
      "Strongly Disagree": ["Fairy", "Mermaid"],
      "Disagree": ["Fairy", "Mermaid"],
      "Neutral": ["Mermaid", "Witch"],
      "Agree": ["Princess", "Witch", "Princess"],
      "Strongly Agree": ["Princess", "Witch", "Pirate"]
    }
  },
  {
    text: 'People describe me as mysterious.',
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Princess", "Witch"],
      "Neutral": ["Pirate"],
      "Agree": ["Fairy", "Mermaid"],
      "Strongly Agree": ["Mermaid"]
    }
  },
  {
    text: 'I am very considerate of other people’s feelings.',
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Pirate", "Witch"],
      "Neutral": ["Mermaid"],
      "Agree": ["Fairy", "Princess"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: 'I am a procrastinator.',
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Witch", "Princess"],
      "Neutral": ["Mermaid"],
      "Agree": ["Pirate", "Fairy"],
      "Strongly Agree": ["Pirate"]
    }
  },
  {
    text: 'I love to make lists.',
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Pirate", "Mermaid"],
      "Neutral": ["Fairy"],
      "Agree": ["Witch", "Princess"],
      "Strongly Agree": ["Witch"]
    }
  },
  {
    text: 'I consider myself laidback.',
    map: {
      "Strongly Disagree": ["Witch"],
      "Disagree": ["Witch", "Princess"],
      "Neutral": ["Pirate"],
      "Agree": ["Fairy", "Mermaid"],
      "Strongly Agree": ["Fairy"]
    }
  },
  {
    text: 'I make my work/notes aesthetically pleasing.',
    map: {
      "Strongly Disagree": ["Pirate"],
      "Disagree": ["Pirate", "Mermaid"],
      "Neutral": ["Witch"],
      "Agree": ["Fairy", "Princess"],
      "Strongly Agree": ["Fairy"]
    }
  },
];


// --- Component ---
export default function Test() {
  const [answers, setAnswers] = useState<(LikertOption | null)[]>(
    Array(questions.length).fill(null)
  );
  const [results, setResults] = useState<Record<Character, number> | null>(null);

  // --- Handlers ---
  const handleChange = (qIndex: number, label: LikertOption) => {
    const copy = [...answers];
    copy[qIndex] = label;
    setAnswers(copy);
  };

  const isComplete = answers.every(a => a !== null);

  const calculateResults = () => {
    // Initialize scores
    const scores: Record<Character, number> = {
      Princess: 0,
      Fairy: 0,
      Witch: 0,
      Pirate: 0,
      Mermaid: 0
    };

    let totalPoints = 0;

    // Tally scores
    answers.forEach((answer, qIndex) => {
      if (!answer) return;

      const points = pointsMap[answer];
      const characters = questions[qIndex].map[answer];

      characters.forEach(char => {
        scores[char] += points;
        totalPoints += points;
      });
    });

    // Calculate percentages
    const characters: Character[] = ["Princess", "Fairy", "Witch", "Pirate", "Mermaid"];
    const percentages: Record<Character, number> = {
      Princess: 0,
      Fairy: 0,
      Witch: 0,
      Pirate: 0,
      Mermaid: 0
    };

    characters.forEach(char => {
      percentages[char] = totalPoints > 0
        ? Math.round((scores[char] / totalPoints) * 100)
        : 0;
    });

    setResults(percentages);

    console.log({ scores, totalPoints, percentages });
  };

  // Convert results to PieChart data format
  const pieData = results
    ? Object.entries(results).map(([char, percent]) => ({
        name: char,
        value: percent
      }))
    : [];

  // --- Render ---
  return (
    <>
    <div className="text-center">
  <button>Test Button</button>
</div>
      {questions.map((q, qIndex) => (
        <Card key={qIndex} className="mb-4">
          <Card.Body className="text-center">
            {q.text}
          </Card.Body>

          <Form className="d-flex justify-content-center gap-4">
            {options.map((label, oIndex) => (
              <label key={oIndex} className="clickable likert-option">
                <input
                  type="radio"
                  name={`q${qIndex}`}
                  checked={answers[qIndex] === label}
                  onChange={() => handleChange(qIndex, label)}
                />
                <span className="likert-label">{label}</span>
              </label>
            ))}
          </Form>
        </Card>
      ))}

      <div className="text-center mb-4">
        <Button 
          disabled={!isComplete} 
          onClick={calculateResults}
          size="lg"
        >
          See Results
        </Button>
      </div>

      {results && (
        <Card className="mb-4 p-4 d-flex flex-column align-items-center mt-4">
          <h5 className="text-center mb-3">Your Personality Results</h5>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${Math.round((percent ?? 0) * 100)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[entry.name as Character]} />
              ))}
            </Pie>
            <Tooltip formatter={(value?: number) => (value !== undefined ? `${value}%` : '')} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </Card>
      )}
    </>
  );
}