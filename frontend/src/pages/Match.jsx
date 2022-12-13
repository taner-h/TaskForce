import React, { useState, useEffect } from 'react';
import { Button, Center } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getProjects, getUser, getTasks } from '../reducers/authSlice';
import { project } from '../data/options';

export default function Match() {
  const [tagIds, setTagIds] = useState({});
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [isTagIdsFetched, setIsTagIdsFetched] = useState(false);

  const user = useSelector(getUser);
  const projects = useSelector(getProjects);
  const tasks = useSelector(getTasks);

  useEffect(() => {
    getTagIds();
  }, []);

  async function getTagIds() {
    const body = {
      created: projects?.creator,
      member: projects?.member,
      applied: projects?.applicant,
      opened: tasks?.created,
      committed: tasks?.committed,
      answered: tasks?.answered,
    };
    try {
      const response = await fetch(`http://localhost:5000/user/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      setTagIds(res);
      setIsTagIdsFetched(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getProjectMatches() {
    if (isTagIdsFetched) {
      const body = {
        userId: user.user_id,
        fields: user.fields.map(field => field.field_id),
        skills: user.skills.map(skill => skill.skill_id),
        created: tagIds.created,
        member: tagIds.member,
        applied: tagIds.applied,
        opened: tagIds.opened,
        committed: tagIds.committed,
        answered: tagIds.answered,
      };
      try {
        const response = await fetch(`http://localhost:5000/project/match`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const res = await response.json();
        setMatchedProjects(res);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  return (
    <Center>
      <Button onClick={getProjectMatches}>Match</Button>
    </Center>
  );
}
