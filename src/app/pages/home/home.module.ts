import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "home",
    component: HomePage,
    children: [
      {
        path: "subscription",
        children: [
          {
            path: "",
            loadChildren:
              "../subscription/subscription.module#SubscriptionPageModule"
          }
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: "../profile/profile.module#ProfilePageModule"
          }
        ]
      },
      {
        path: "add",
        children: [
          {
            path: "",
            loadChildren: "../add/add.module#AddPageModule"
          }
        ]
      },
      {
        path: "edit",
        children: [
          {
            path: "",
            loadChildren:"../edit-subscription/edit-subscription.module#EditSubscriptionPageModule"
          }
        ]
      },
    ]
  },
  {
    path: "",
    redirectTo: "home/subscription",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
