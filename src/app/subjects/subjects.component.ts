import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Subject } from './subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects:any;
  grades:any;
  students:any;
  detailsInit:boolean;

  addStudentId:string;
  addSemester:string;
  addValue:string;



  selectedSubject:Subject;
  editInit:boolean;
  addGradeInit:boolean;
  initSubject: boolean;
  addedSubject: Subject;

  constructor(
    public serverService:ServerService
  ) {}

  ngOnInit() {

    this.serverService.getSubjects().subscribe(subjects =>{
      this.subjects = subjects;
    });
    this.serverService.getStudents().subscribe(students =>{
      this.students = students;
    });
    this.serverService.getGrades().subscribe(grades =>{
      this.grades = grades;
    })
  }

  onEditClick(subject:Subject) {
    this.editInit = true;
    this.selectedSubject = subject;
  }

  onEditSubmit(id, subject){
    this.serverService.updateSubject(id, subject);
    this.editInit = false;
  }

  onAddInit(){
    this.initSubject = true;
    this.addedSubject = {
      name:'',
      lecturer:''
    };
  }

  onAddGradeInit(){
    this.addGradeInit = true;
  }

  onAddGradeSubmit(){
    this.serverService.addGrade(
      {
        subjectId: this.selectedSubject.$key,
        studentId: this.addStudentId,
        value: this.addValue,
        semester: this.addSemester
      }
    );
    this.addGradeInit = false;
    this.addStudentId='';
    this.addSemester='';
    this.addValue='';
  }

  onAddSubmit(subject){
    this.serverService.addSubject(subject);
    this.initSubject = false;
  }

  onDeleteClick(id){
    this.serverService.deleteSubject(id);
  }

  onDblGradeClick(id){
    this.serverService.deleteGrade(id);
  }

  onSelect(subject:Subject) {
    this.selectedSubject = subject;
    this.detailsInit = true;
  }

  CancelEdit() {
    this.editInit = false;
    this.serverService.getSubjects().subscribe(subjects =>{
      this.subjects = subjects;
    });
  }

  CancelAdd() {
    this.initSubject = false;
  }

  CancelAddGrade(){
    this.addGradeInit = false;
  }
}
