import { Injectable, NotFoundException } from "@nestjs/common";
import { Session } from './session.model'

@Injectable()
export class SessionsService {
    private sessions: Session[] = [];    

    async saveSession(participant: number, code_version: string, comment: string) {        
        const sessId = Math.random().toString(); // Create random numbers for Id. But same number can be generated
        const newSession = new Session(sessId, participant, code_version, comment);
        this.sessions.push(newSession);

        const fs = require('fs');
        fs.writeFileSync('sessions.json', JSON.stringify(newSession))
        return sessId;
    }

    getSessions() {
        return [...this.sessions]; 
    }

    getSingleSession(sessionId: string) { 
        const session = this.findSession(sessionId)[0]; 
        if (!session) {
            throw new NotFoundException('Could not find session.');
        }
        return {...session}; 
    }

    updateSession(sessionId: string, participant: number, code_version: string, comm: string) {
        const [session, index] = this.findSession(sessionId);        

        const updatedSession = { ...session };
        if (participant) {
          updatedSession.participant = participant;
        }
        if (code_version) {
          updatedSession.code_version = code_version;
        }
        if (comm) {
          updatedSession.comment = comm;
        }
        this.sessions[index] = updatedSession;
    }

    private findSession(id: string): [Session, number] { 
        const sessionIndex = this.sessions.findIndex(session => session.id === id);
        const session = this.sessions[sessionIndex];
        if (!session) {
          throw new NotFoundException('Could not find session.');
        }
        return [session, sessionIndex]
    }

}


