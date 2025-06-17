import { type Shape } from '../models/shapes';

const KEY = 'paint-line-project';
interface ProjectJSON {
  name: string;
  shapes: Shape[];
}

export const loadProject = (): ProjectJSON => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { name: 'Untitled', shapes: [] };
    const data = JSON.parse(raw);

    // Back‑compat: if the stored value is an array, treat it as shapes only
    if (Array.isArray(data)) {
      return { name: 'Untitled', shapes: data as Shape[] };
    }
    // basic validation
    if (typeof data.name === 'string' && Array.isArray(data.shapes)) {
      return data as ProjectJSON;
    }
  } catch {
    /* ignored */
  }
  return { name: 'Untitled', shapes: [] };
};

export const saveProject = (proj: ProjectJSON) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(proj));
  } catch {
    /* ignore */
  }
};
