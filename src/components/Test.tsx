import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import '../styles/test.css'



export default function Test() {
  const options = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  const questions = [
    'I am a planner.',
    'I enjoy getting out of my comfort zone.',
    'I always do my nighttime routine or skincare routine before bed.',
    'I like to travel alone',
    'I plan out my schedule each week.',
    'I have an addictive personality.',
    'If I set a goal for the day I have to accomplish it or I will be upset with myself.',
    'I like my space to be clean before I go to sleep.',
    'I consider myself a patient person.',
    'I’m always early to my commitments.',
    'I have a crafty or creative hobby or project.',
    'I have thoughtfully decorated my living space.',
    'I usually meal plan or meal prep.',
    'I like to track my health and activity.',
    'I cry more than once a month.',
    'When I am invited to things and I am not busy, I always go.',
    'I am easily convinced.',
    'I get really bad FOMO.',
    'I tend to push boundaries.',
    'If I stay overnight at someone’s place, I need to bring all my stuff with me.',
    'If there is a lull in conversation, I’m going to fill it.',
    'I consider myself detail oriented.',
    'I would work a job I hate if it paid really well.',
    'When I have some extra money I treat myself.',
    'I prefer to travel to places that are off the beaten path.',
    'When I’m upset I’m more likely to get angry than to cry.',
    'When I have a problem I ask people for their opinions on what I should do.',
    'I fall in love easily.',
    'I consider myself confrontational.',
    'I need my me-time.',
    'People describe me as independent.',
    'I consider myself spontaneous.',
    'I am bothered by mess.',
    'People describe me as bossy.',
    'I am more driven than my friends.',
    'I clean more than my roommates or housemates do.',
    'I often find myself in leadership positions.',
    'People describe me as mysterious.',
    'I am very considerate of other people’s feelings.',
    'I am a procrastinator.',
    'I love to make lists.',
    'I consider myself laidback.',
    'I make my work/notes aesthetically pleasing.'
  ];

  return (
    <>
      {questions.map((question, qIndex) => (
        <Card key={qIndex} className='mb-4'>
          <Card.Body className='text-center'>
            {question}
          </Card.Body>

          <Form className='d-flex justify-content-center gap-4'>
            {options.map((label, i) => (
              <label key={i} className='clickable mb-3 likert-option'>
                <Form.Check 
                  type='radio'
                  name='options'
                  id={`q${i}`}
                />
                <span className='likert-label'>{label}</span>
              </label>
            ))}
          </Form>
        </Card>
      ))}
    </>
  )
}