import { User } from "./User";

export class Employees extends User {
    sociability: number;
    engineeringSkill: number;
    timeManagement: number;
    knowledgeOfLanguages: number;
    projects: object[];
}