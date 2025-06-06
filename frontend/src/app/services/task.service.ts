import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

 private updateTasks = new Subject<void>();

 wasTaskUpdated = this.updateTasks.asObservable();

 taskWasCreated(){
  this.updateTasks.next();
 }

  criarTask(codigo: number, data: any, descricao: string, user: string, medico_cpf: string){
    const body = {codigo, data, descricao, user, medico_cpf};
        return this.http.post('http://localhost:3000/tasks/add', body);

  }

  getAllTasks(id: string, typeUser: string){
    const body = {id, typeUser};
    return this.http.post('http://localhost:3000/tasks/', body);
  }

  marcarRealizado(codigo: string){
    const body = {codigo};
    return this.http.post('http://localhost:3000/tasks/realizar', body)
  }

  getMedicos(){
    return this.http.get('http://localhost:3000/tasks/getMedicos')
  }
}
