import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AppLayoutComponent } from './share/app-layout/app-layout.component';
import { LoginLayoutComponent } from './share/login-layout/login-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MATERIAL_MODULE } from './material/material.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import 'firebase/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ProductsComponent } from './pages/products/products.component';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { CategoryComponent } from './pages/category/category.component';
import { HeaderComponent } from './share/header/header.component';
import { SideBarComponent } from './share/side-bar/side-bar.component';
import { AddCategoryComponent } from './dialog/add-category/add-category.component';
import { APP_SERVICES } from './services/app.service';
import { APP_STORE } from './store/app.store';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePagesComponent } from './home-pages/home-pages.component';
import { FrontHeaderComponent } from './home-pages/front-header/front-header.component';
import { SearchContainerComponent } from './home-pages/search-container/search-container.component';
import { HomeCategoryComponent } from './home-pages/home-category/home-category.component';
import { FeatureProductsComponent } from './home-pages/feature-products/feature-products.component';
import { PopularListComponent } from './home-pages/popular-list/popular-list.component';
import { MobxAngularModule } from 'mobx-angular';
import { DeleteComponent } from './dialog/delete/delete.component';
import { EditComponent } from './dialog/edit/edit.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import {HttpClientModule} from '@angular/common/http';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { AddProductComponent } from './dialog/add-product/add-product.component';
import { ProductEditComponent } from './dialog/product-edit/product-edit.component';
import { HouseEditComponent } from './dialog/house-edit/house-edit.component';
import { HouseAddComponent } from './dialog/house-add/house-add.component';
import { HomesComponent } from './pages/homes/homes.component';
import { MonkNameComponent } from './stepper/monk-name/monk-name.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTreeModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DataComponent } from './dashboard/data/data.component';
import { DragDropComponent } from './dashboard/drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableComponent } from './dashboard/table/table.component';
import { NavComponent } from './dashboard/nav/nav.component';
import { AddressFormComponent } from './dashboard/address-form/address-form.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UploadCoverComponent } from './dialog/upload-cover/upload-cover.component';
import { InfoOneComponent } from './information/info-one/info-one.component';
import { InfoTwoComponent } from './information/info-two/info-two.component';
import { InfoThreeComponent } from './information/info-three/info-three.component';
import { InfoFourComponent } from './information/info-four/info-four.component';
import { InfoFiveComponent } from './information/info-five/info-five.component';
import { DataManagementComponent } from './monk/data-management/data-management.component';
import { PhnomPenhAddressComponent } from './information/phnom-penh-address/phnom-penh-address.component';
import { PhnomPenhComponent } from './pages/phnom-penh/phnom-penh.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginComponent,
    AppLayoutComponent,
    LoginLayoutComponent,
    ProductsComponent,
    AdministratorComponent,
    CategoryComponent,
    HeaderComponent,
    SideBarComponent,
    AddCategoryComponent,
    NotFoundComponent,
    HomePagesComponent,
    FrontHeaderComponent,
    SearchContainerComponent,
    HomeCategoryComponent,
    FeatureProductsComponent,
    PopularListComponent,
    DeleteComponent,
    EditComponent,
    ImageUploadComponent,
    AddProductComponent,
    ProductEditComponent,
    HouseEditComponent,
    HouseAddComponent,
    HomesComponent,
    MonkNameComponent,
    DashboardComponent,
    DataComponent,
    DragDropComponent,
    TableComponent,
    NavComponent,
    AddressFormComponent,
    ProfileComponent,
    SignupComponent,
    UploadCoverComponent,
    InfoOneComponent,
    InfoTwoComponent,
    InfoThreeComponent,
    InfoFourComponent,
    InfoFiveComponent,
    DataManagementComponent,
    PhnomPenhAddressComponent,
    PhnomPenhComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MobxAngularModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MATERIAL_MODULE,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, LayoutModule, MatTreeModule, DragDropModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule // imports firebase/storage only needed for storage features
  ],
  entryComponents:[
    AddCategoryComponent,
    DeleteComponent,
    EditComponent,
    AddProductComponent,
    ProductEditComponent,
    HouseAddComponent,
    HouseEditComponent,
    MonkNameComponent,
    UploadCoverComponent,
    DataManagementComponent,
  ],
  providers: [,AuthGuard,AuthService,APP_SERVICES,APP_STORE],
  bootstrap: [AppComponent]
})
export class AppModule { }
