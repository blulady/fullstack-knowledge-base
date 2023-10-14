import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("A test recipe", "simply a test", "https://cdn.pixabay.com/photo/2015/10/26/07/21/vegetables-1006694_960_720.jpg" ),
    new Recipe("Another test recipe", "simply a test", "https://cdn.pixabay.com/photo/2015/08/25/03/50/herbs-906140_960_720.jpg" )

  ];
  constructor() {}
  ngOnInit() {}


  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
  }

