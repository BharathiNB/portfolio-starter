import { Request, Response } from 'express';
import { getProjects, getProjectById } from '../services/projectsService';

export const getAllProjects = (req: Request, res: Response) => {
  const projects = getProjects();
  res.status(200).json({ success: true, data: projects });
};

export const getProject = (req: Request, res: Response) => {
  const { id } = req.params;
  const project = getProjectById(id);
  
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  
  res.status(200).json({ success: true, data: project });
};
