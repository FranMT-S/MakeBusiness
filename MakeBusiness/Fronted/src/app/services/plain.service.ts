import { Injectable } from '@angular/core';
import { Plan } from '../interfaces/plains';

import {environment} from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





interface PlanResponse {
  ok:       boolean;
  plans: Plan[];
  plan:  Plan;
  error: any;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private url = `${environment.baseUrl}/plans`

  constructor(private http:HttpClient) { }

  get getAllPlans():Observable<PlanResponse>{
    return this.http.get<PlanResponse>(this.url)
  }

  getPlan(id:string):Observable<PlanResponse>{
    return this.http.get<PlanResponse>(`${this.url}/${id}`)
  }

  deletePlan(id:string):Observable<PlanResponse>{
    return this.http.delete<PlanResponse>(`${this.url}/${id}`)
  }

  addPlan(plan:Plan):Observable<PlanResponse>{
    return this.http.post<PlanResponse>(`${this.url}`,plan)
  }

  updatePlan(id:string,plan:Plan):Observable<PlanResponse>{
    return this.http.put<PlanResponse>(`${this.url}/${id}`,plan)
  }
}
