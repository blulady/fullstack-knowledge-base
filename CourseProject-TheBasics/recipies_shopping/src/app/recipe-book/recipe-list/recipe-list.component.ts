import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A test recipe", "simply a test", "https://cdn.pixabay.com/photo/2015/10/26/07/21/vegetables-1006694_960_720.jpg" ),
    new Recipe("A test recipe", "simply a test", "https://cdn.pixabay.com/photo/2015/10/26/07/21/vegetables-1006694_960_720.jpg" )

  ];
  constructor() {}
  ngOnInit() {}
  // interface OnInit {
  //   ngOnInit(): void
  }

