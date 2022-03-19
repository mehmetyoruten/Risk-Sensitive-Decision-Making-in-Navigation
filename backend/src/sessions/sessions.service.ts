import { Injectable, NotFoundException } from "@nestjs/common";
import { Session } from './session.model'

@Injectable()
export class SessionsService {
    private sessions: Session[] = [];    

    async saveSession(sessId:string, participant: number, code_version: string, comment: string) {        
        const fs = require('fs');
        
       
        //this.sessions[this.sessions.length - 1].id

        // Create new session info        
        //const sessId = Math.random().toString(16).substr(2, 16) // Create random hash for session Id.
        const newSession = new Session(sessId, participant, code_version, comment);
        
        // Read session info
        this.readSession();

        // Add data to the object
        this.sessions.push(newSession);
        console.log(newSession)
        let json = JSON.stringify(this.sessions); // Convert it back to JSON
        
        
        fs.writeFile("./sessions.json", json, 'utf8', (err) => {
          if (err) {
            console.log(`Error writing file: ${err}`);
          } else {
            console.log(`Session is written successfully!`);
          }
        });
        return sessId;
    }

    async readSession(){
      const fs = require('fs');    
      // Get content from file
      var contents = fs.readFileSync("sessions.json");
      // Define to JSON type
      this.sessions = JSON.parse(contents);         
      return this.sessions[this.sessions.length - 1]
    }

    getSessions() {
        return [...this.sessions]; 
    }

    getSingleSession(sessionId: string) { 
        this.readSession();
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

        const fs = require('fs');
        fs.writeFile("./sessions.json", JSON.stringify(this.sessions), 'utf8', (err) => {
          if (err) {
            console.log(`Error updating file: ${err}`);
          } else {
            console.log(`Session is updated successfully!`);
          }
        });
    }

    private findSession(id: string): [Session, number] { 
        this.readSession();
        const sessionIndex = this.sessions.findIndex(session => session.id === id);
        const session = this.sessions[sessionIndex];
        if (!session) {
          throw new NotFoundException('Could not find session.');
        }
        return [session, sessionIndex]
    }

}
