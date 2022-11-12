import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';


import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { fileCompany } from 'src/app/interfaces/fileCompany';




@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

//   settings = {
//     speed: 500,
//     counter: false,
//     plugins: [lgZoom]
//   };

//   settings2 = {
//     speed: 500,
//     counter: false,
//     plugins: [lgVideo]
//   };

//   dataVideo = {
//     source: [
//         {
//             src: '../../../../../assets/Companies/Files/03.mp4',
//             type: 'video/mp4',
//         }
      
//     ],
//     attributes: { preload: false, controls: true },
// };

// onBeforeSlide = (detail: BeforeSlideDetail): void => {
//   const { index, prevIndex } = detail;
//   console.log(index, prevIndex);
// };

  images:fileCompany[] = [];  
  videos:fileCompany[] = []; 
  filesGenerics:fileCompany[] = []; 


  constructor(private activatedRoute:ActivatedRoute, private companyService:CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCurrentFiles.forEach(e => {
      
      if(e.name.match(".jpg|png") != null)
        this.images.push(e);
      else if(e.name.match(".mp4") != null)
        this.videos.push(e);
      else
        this.filesGenerics.push(e);
    })
  }
  

  
  
}
