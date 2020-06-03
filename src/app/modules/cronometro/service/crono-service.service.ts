import { Injectable } from '@angular/core';
import { Time } from '../libs/models/time';

@Injectable({
  providedIn: 'any'
})
export class CronoServiceService {

  private list: Time[];
  private id: number;
  private finishList: boolean;

  constructor() {
    this.list = [];
    this.id = 0;
    this.finishList = false;
  }

  private insertTime(title: string, hours: number,
    minutes: number, seconds: number) {
    let time = new Time(this.id, title, { hours, minutes, seconds }, "waiting");
    this.list.push(time)
    this.id++;
  }

  getTime(idAux: number) {
    return this.list.filter((lista) => {
      return idAux == lista.id;
    });
  }

  getList() : Time[] {
    return this.list;
  }

  updateTime(idAux: number, st?: string, tl?: string, h?: number, m?: number, s?: number) {
    let index = this.list.findIndex((lista) => {
      return idAux == lista.id;
    });
    let _time = this.list[index];
    _time.title = ((tl !== null && tl !== undefined) ? tl : _time.title);
    _time.time.hours = ((h !== null && h !== undefined) ? h : _time.time.hours);
    _time.time.minutes = ((m !== null && m !== undefined) ? m : _time.time.minutes);
    _time.time.seconds = ((s !== null && s !== undefined) ? s : _time.time.seconds);
    _time.setStatus = ((st !== null && st !== undefined) ? st : _time.getStatus);
  }

  routineCreate(qty: number, mainTitle: string,
    mainTime: { h: number, m: number, s: number },
    breakTitle?: string,
    breakTime?: { h: number, m: number, s: number }
  ) {
    for (let i = 0; i < qty; i++) {
      this.insertTime(mainTitle, mainTime.h, mainTime.m, mainTime.s);
      if (breakTime !== null && breakTime !== undefined) {
        this.insertTime(breakTitle, breakTime.h, breakTime.m, breakTime.s);
      }
    }
  }

  restartList() {
    this.list = this.list.map(time => {
      time.setStatus = 'waiting';
      return time
    });
  }

  changeListState(){
    this.finishList = !this.finishList;
  }

  clearList(){
    this.list = [];
  }

  get getRoutineState(){
    return this.finishList;
  }



}
