import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[]
  subscription: Subscription;
  constructor(private RecipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.recipes = this.RecipeService.getRecipes();
    this.subscription = this.RecipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) =>{
      this.recipes = recipes;
    });
  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


