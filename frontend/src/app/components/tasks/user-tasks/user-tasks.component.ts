import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NewTaskComponent } from '../new-task/new-task.component';


@Component({
  selector: 'app-user-tasks',
  imports: [CommonModule, RouterLink, NewTaskComponent],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})

export class UserTasksComponent {

tasks = [
  { titulo: 'Consulta Nutricional', info: '12/06 às 14:00' },
  { titulo: 'Atendimento Psicológico', info: '13/06 às 10:00' },
];

realizadas = [
  { nome: 'Consulta de Maio' },
  { nome: 'Avaliação Psicológica' },
];

pendentes = [
  { nome: 'Nutrição Junho' },
  { nome: 'Consulta Jurídica' },
];

  isOpen: boolean = false;
  user: any;
  email: any =  '';
  userId: any = '';
  constructor(private auth: AuthService, private router: Router){
    this.router.events.subscribe(() => {
      this.isOpen = this.router.url.includes('/tasks/new-task');
    });
  }
   ngOnInit(){
    this.user = this.auth.user()
    if (this.user) {
      console.log('Usuário logado:', this.user);
    }
    this.transformaId();
  }
  transformaId(){
  this.email = this.user?.payload.email;
  this.email = this.email.split('@');
  this.userId = this.email[0]
  console.log(this.userId)
  }

  
  closeModal() {
    this.router.navigate(['/tasks']);
  }
}
