import Project from "../models/project.model.js";
import { makeCrud } from "./crud.factory.js";
export const { getAll, getById, createOne, updateById, removeById, removeAll } = makeCrud(Project);
