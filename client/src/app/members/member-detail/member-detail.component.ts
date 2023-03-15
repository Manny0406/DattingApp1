import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Members } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Members | undefined; // | undefined, specifies that the member is undefined
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private memberService:MembersService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      }
    ]   
  }

  getImages() {
    if(!this.member) return []; // if there is no member then return an empty array

    const imageUrls = [];
    for (const photo of this.member.photos){
      imageUrls.push({
        small:photo.url,
        medium: photo.url,  // the properties small, medium and big have to be these names
        big: photo.url
      })
    }

    return imageUrls;
  }

  loadMember(){
    var username = this.route.snapshot.paramMap.get('username'); // username word has to match what is in the route in app-routing.module
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.galleryImages = this.getImages();
      }
    })  
  }

}
