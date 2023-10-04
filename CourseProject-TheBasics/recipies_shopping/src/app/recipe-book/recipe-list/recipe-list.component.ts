import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A test recipe", "simply a test", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Frecipe&psig=AOvVaw16JeRdfkwMvoXH51Y0fzj9&ust=1696476469103000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCa6Ly524EDFQAAAAAdAAAAABAE" )

  ];
  constructor() {}
  ngOnInit() {}
  // interface OnInit {
  //   ngOnInit(): void
  }

}
