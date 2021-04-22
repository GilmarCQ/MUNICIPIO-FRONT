import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    // private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {}

  public cerrarSesion(): void {
    // this.authService.logOut()
    //   .then( () => {
    //     this.router.navigate(['./productos'])
    //   })
    //   .catch((error) => console.log(error) );
  }

}
