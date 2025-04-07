import { BadgeType } from "../components";

export interface ILog {
    id: number;
    content: string;
    type: BadgeType;
    oldContent: string;
}

const LOG_KEY = "logs";
let logIdCounter = parseInt(localStorage.getItem("logIdCounter") || "1");

const saveLogs = (logs: Record<number, ILog>) => {
    localStorage.setItem(LOG_KEY, JSON.stringify(logs));
    localStorage.setItem("logIdCounter", String(logIdCounter));
};

export const logStorage = {
    getAll: async (): Promise<ILog[]> => {
        const logs: Record<number, ILog> = JSON.parse(localStorage.getItem(LOG_KEY) || "{}");
        return Object.values(logs).reverse();
    },

    getById: async (id: number): Promise<ILog | undefined> => {
        const logs: Record<number, ILog> = JSON.parse(localStorage.getItem(LOG_KEY) || "{}");
        return logs[id];
    },

    create: async (content: string, type: BadgeType, oldContent = ""): Promise<ILog> => {
        const logs: Record<number, ILog> = JSON.parse(localStorage.getItem(LOG_KEY) || "{}");
        const newLog: ILog = {
            id: logIdCounter,
            content,
            type,
            oldContent,
        };
        logs[logIdCounter] = newLog;
        logIdCounter++;
        saveLogs(logs);
        return newLog;
    },

    update: async (id: number, content: string, type: BadgeType, oldContent: string): Promise<ILog | null> => {
        const logs: Record<number, ILog> = JSON.parse(localStorage.getItem(LOG_KEY) || "{}");
        if (logs[id]) {
            logs[id] = { ...logs[id], content, type, oldContent };
            saveLogs(logs);
            return logs[id];
        }
        return null;
    },

    delete: async (id: number): Promise<ILog | null> => {
        const logs: Record<number, ILog> = JSON.parse(localStorage.getItem(LOG_KEY) || "{}");
        const deleted = logs[id];
        if (deleted) {
            delete logs[id];
            saveLogs(logs);
            return deleted;
        }
        return null;
    },

    clear: async (): Promise<void> => {
        localStorage.removeItem(LOG_KEY);
        localStorage.setItem("logIdCounter", "1");
    },
};
