import { Router } from 'express';
import { getAllProjects, getProject } from '../controllers/projectsController';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);

export default router;
