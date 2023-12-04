import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user/user.service";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./user.action";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class UserEffects{


    constructor(private _actions:Actions,private userService:UserService){}

    loadUsers$ = createEffect(() =>
    this._actions.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getAllUsers().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );
}