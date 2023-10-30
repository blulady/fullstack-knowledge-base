import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[]
  constructor(private RecipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.recipes = this.RecipeService.getRecipes();
  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}


