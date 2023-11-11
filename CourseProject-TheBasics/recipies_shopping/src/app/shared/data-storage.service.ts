import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipe-book/recipe.service";
import { Recipe } from '../recipe-book/recipe.model';
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recpesService: RecipeService) {}

  storeRecipes () {
    const recipes = this.recpesService.getRecipes();
    this.http.put('https://ng-course-recipe-book-a47ec-default-rtdb.firebaseio.com/recipes.json',
    recipes)
    .subscribe(response => {console.log(response);});
  }

  fetchRecipes() {
this.http.get<Recipe[]>('https://ng-course-recipe-book-a47ec-default-rtdb.firebaseio.com/recipes.json')
.pipe(map(recipes => {
  return recipes.map(recipe => {
    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
  })
} ))
.subscribe(recipes => {
  this.recpesService.setRecipes(recipes);
});
  }

}
