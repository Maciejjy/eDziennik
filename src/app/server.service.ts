import { Injectable } from '@angular/core';
import { AngularFireDatabase,  FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Student } from './students/student';
import { Schedule } from './schedule/schedule';
import { Subject } from './subjects/subject';
import { Grade } from './subjects/grade';
import { Message } from './chat/message';
import { User } from './user';


@Injectable()
export class ServerService {

  students: FirebaseListObservable<any[]>;
  subjects: FirebaseListObservable<any[]>;
  grades: FirebaseListObservable<any[]>;
  schedule: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;
  chat: FirebaseListObservable<any[]>;
  currentUserMail:string='0';
  currentUserRole:string;
  currentUserName:string;
  currentUserLastname:string;

  constructor( private af:AngularFireDatabase, private afAuth:AngularFireAuth) {
  }

  getCurrentUser() {

    this.afAuth.authState.subscribe(auth =>{
      if (auth != null){
        this.currentUserMail = auth.email;
        this.getUsers().subscribe(users =>{
          for (let user of users){
            if (this.currentUserMail===user.email) {
              this.currentUserRole=user.role;
              this.currentUserName=user.name;
              this.currentUserLastname=user.lastname;
            }
          }
        });
      }
    });
  }


  getStudents(){
    this.students=this.af.list('/students') as FirebaseListObservable<Student[]>;
    return this.students;
  }

  getSubjects(){
    this.subjects=this.af.list('/subjects') as FirebaseListObservable<Subject[]>;
    return this.subjects;
  }

  getGrades(){
    this.grades=this.af.list('/grades') as FirebaseListObservable<Grade[]>;
    return this.grades;
  }

  getSchedule(){
    this.schedule=this.af.list('/schedule') as FirebaseListObservable<Schedule[]>;
    return this.schedule;
  }

  getUsers(){
    this.users=this.af.list('/users') as FirebaseListObservable<User[]>;
    return this.users;
  }

  getChat(){
    this.chat=this.af.list('/chat') as FirebaseListObservable<Message[]>;
    return this.chat;
  }


  addStudent(student){
    return this.students.push(student);
  }

  addSubject(subject){
    return this.subjects.push(subject);
  }

  addGrade(grade){
    return this.grades.push(grade);
  }

  addSched(sched){
    return this.schedule.push(sched);
  }

  addUser(user){
    return this.users.push(user);
  }

  addMessage(message){
    return this.chat.push(message);
  }


  updateStudent(id, student){
    return this.students.update(id,student);
  }

  updateSubject(id, subject){
    return this.subjects.update(id,subject);
  }

  updateSched(id, sched){
    return this.schedule.update(id,sched);
  }

  updateUser(id, user){
    return this.users.update(id,user);
  }


  deleteStudent(id){
    return this.students.remove(id);
  }

  deleteSubject(id){
    return this.subjects.remove(id);
  }

  deleteGrade(id){
    return this.grades.remove(id);
  }

  deleteShed(id){
    return this.schedule.remove(id);
  }

  deleteUser(id){
    return this.users.remove(id);
  }

  deleteMessage(id){
    return this.chat.remove(id);
  }

}
