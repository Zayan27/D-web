import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-clients',
  standalone: true,
  imports: [NgFor],
  templateUrl: './our-clients.component.html',
  styleUrl: './our-clients.component.scss'
})
export class OurClientsComponent {
  clientsLogos: any = [
    {
      logo: 'assets/clientLogos/testLogo1.png'
    },
    {
      logo: 'assets/clientLogos/testLogo2.png'
    },
    {
      logo: 'assets/clientLogos/testLogo3.png'
    },
    {
      logo: 'assets/clientLogos/testLogo4.png'
    }
    ,
    {
      logo: 'assets/clientLogos/testLogo5.png'
    },
    {
      logo: 'assets/clientLogos/testLogo6.png'
    },
    {
      logo: 'assets/clientLogos/testLogo7.png'
    }
    ,
    {
      logo: 'assets/clientLogos/testLogo8.png'
    },
    {
      logo: 'assets/clientLogos/testLogo9.png'
    }
  ]
}
