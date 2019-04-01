import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File=null;
onFileSelected(event){
this.selectedFile = <File> event.target.files[0];
}
onUpload(){
  const fd=new FormData();
  fd.append('image',this.selectedFile, this.selectedFile.name);
this.http.post('https://us-central1-fb-cloud-function.cloudfunction.net/uploadfile',fd)
.subscribe(res=>{
  console.log(res)
})
}
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

}
