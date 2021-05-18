import { Component } from '@angular/core';
import { AuthServiceService } from './Services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BBKBootcamp';

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(res => {
      if (res.status === 'Success') {
        this.authService.setCurrentUser(res.data);
      }
    });
  }


}
