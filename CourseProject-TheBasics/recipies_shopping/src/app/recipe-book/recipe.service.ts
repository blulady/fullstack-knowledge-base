import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingrident.model";
import { ShoppingListService } from "../shopping-list/shoppin-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("A test recipe", "simply a test", "https://cdn.pixabay.com/photo/2015/10/26/07/21/vegetables-1006694_960_720.jpg", [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ] ),
    new Recipe("Another test recipe", "simply a test", "https://cdn.pixabay.com/photo/2015/08/25/03/50/herbs-906140_960_720.jpg", [
      new Ingredient('tomato', 1),
      new Ingredient('green peppers', 20)
    ]
     )

  ];
  constructor(private slService: ShoppingListService) {

  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingridents: Ingredient[]) {
    this.slService.addingredients2(ingridents);
  }
}
