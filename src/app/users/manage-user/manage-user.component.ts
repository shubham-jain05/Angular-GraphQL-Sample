import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { HelperService } from 'src/app/common/services/helper.service';
import { HttpCallService } from 'src/app/common/services/http-call.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { EnvService } from 'src/environments/env.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Apollo, gql, Query, Mutation } from 'apollo-angular';
import { map } from 'rxjs';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  private url = '';
  public p: number = 1;
  public profileList = {} as any;
  public profile: any;
  public loading = false;
  public posts: any;
  public newPost: any = null;
  public ngxLoadingAnimationType = ngxLoadingAnimationTypes;
  public pageSize = [
    {label:5, value:5},
    {label:10, value:10},
    {label:15, value:15},
    {label:25, value:25},
    {label:50, value:50}
  ];
  public selectedPageSize = 5;

  @ViewChild('userTab', {static: false}) userTab: ElementRef | undefined;
  @ViewChild('postTab', {static: false}) postTab: ElementRef | undefined;

  constructor(
    private apollo: Apollo,
    private env:EnvService,
    public helper:HelperService,
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router:Router,
    private route : ActivatedRoute,
    private storage: StorageService,
    private http:HttpCallService) { 

      this.url = this.env?.API_URL;
      let type = this.route.snapshot.paramMap.get('type'); 
      let id  = this.route.snapshot.paramMap.get('id');
      if(type === 'edit' || type === 'delete'){
        if(type === 'delete'){
          this.deleteUserProfile(id);
        }
        if(type === 'edit'){
          this.readUser(id); 
        }
      } else {
        this.getUserProfiles();
      }
    }

  ngOnInit(): void {
   this.LoadGraphQlPost();
   console.log('user tab', this.userTab?.nativeElement);
  }

  getUserProfiles(page: number = 1,pageSize: number = 5){
    const getUrl = this.url + `readUser?page=${page}&pageSize=${pageSize}`; 
    this.loading = true;
    this.http.get(getUrl).subscribe((response: any) =>{
      this.loading = false; 
      this.profileList = response;
    }, error => {
      this.loading = false;
       console.log(error); 
    })
  }

  deleteUserProfile(id:any){
    const getUrl = this.url + `userDelete/${id}`; 
    this.loading = true;
    this.http.delete(getUrl).subscribe((res: any) =>{
      this.loading = false; 
      console.log('delete response',res);
      this.router.navigate(['layout/admin/parent/manageUser']);
      this.getUserProfiles();   
    }, error => {
      this.loading = false;
      console.log(error); 
    });   
  }

  editUserProfile(id: string){
    const getUrl = this.url + `updateUser/${id}`; 
    const payload = {   
      "username": this.profile?.username,
      "name": this.profile?.name,
      "email": this.profile?.email,
      "phone": this.profile?.phone,
      "accessType": 1,
      "about": this.profile?.about,
      "photo":{}
    };
    //console.log('payload', payload);
    this.loading = true;
    this.http.put(payload, getUrl).subscribe((res: any) =>{
      this.loading = false; 
      console.log('delete response',res);
    }, error => {
      this.loading = false;
      console.log(error); 
    });
  }

  readUser(id: any){
    const getUrl = this.url + `readUser/${id}`; 
    this.loading = true;
    this.http.get(getUrl).subscribe((response: any) =>{
      this.loading = false; 
      this.profile = response?.data[0];
    }, error => {
      this.loading = false;
       console.log(error); 
    });
  }

  onAction(item: any, type: string = 'edit'){
    this.router.navigate(['layout/admin/parent/manageUser', type,item?._id]);
  }

  LoadGraphQlPost(){
    this.posts = null;
   const posts = this.apollo
    .watchQuery<Query>({
      query: gql`
      {
        posts(page:1) {
          posts{
            title,
            _id,
            content
          }
          totalPosts
        }
      
      }
      `,
    })
    .valueChanges.pipe(map((result: any) => result?.data?.posts));

    posts.subscribe(res => {
      this.posts = res;
    } ,err => {
      console.log('test err response -> ', err);
    });
  }
  
  onActionPost(item: any, type: string = 'edit'){
    if(type == 'delete'){
        this.deleteGrapQl(item?._id);
    }

    if(type == 'edit'){
      this.newPost = JSON.parse(JSON.stringify(item));
     
    }
  }

  deleteGrapQl(id: any){
    const deletePosts = this.apollo.mutate({
      mutation: gql`mutation($ownerId: ID!){
        deletePost(id: $ownerId)
       }`,
      variables: { ownerId: id}
    })
    deletePosts.subscribe(res => {
      console.log('response -> ', res);
      this.LoadGraphQlPost();
      this.newPost = null;
   });
  }

  updateGraphql(){
    const postInputPayload = {
      title: this.newPost?.title , 
      content: this.newPost?.content, 
      creator:"60f2eff732022d1ea15cd0eb", 
      postTo:"60f2eff732022d1ea15cd0eb"
    }
    const upadtePosts = this.apollo.mutate({
        mutation: gql`mutation($owner: postInputData!, $ownerId: ID!){
          updatePost(id: $ownerId, postInput: $owner){
            _id
          }
        }`,
        variables: {owner: postInputPayload, ownerId: this.newPost._id}
      })
    
    upadtePosts.subscribe(res => {
       console.log('response -> ', res);
       this.LoadGraphQlPost();
       this.newPost = null;
    });
  }

}
