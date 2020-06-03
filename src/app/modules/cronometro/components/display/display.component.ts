import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CronoServiceService } from '../../service/crono-service.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  public hours: string;
  public minutes: string;
  public seconds: string;
  public miliseconds: string;
  private interval: any;
  private intervalMs: any;
  public startFlag: boolean;
  public pauseFlag: boolean;
  public disabledFlag: boolean;
  private awaitT: any;
  private indexRoutine: number;
  @ViewChild('player') player : ElementRef;

  constructor(
    public cronoServ: CronoServiceService
  ) {
    this.hours = "0";
    this.minutes = "0";
    this.seconds = "0";
    this.miliseconds = "0";
    this.startFlag = false;
    this.pauseFlag = false;
    this.disabledFlag = false;
    this.indexRoutine = 0;
  }

  async runRoutine() {
    this.cronoServ.routineCreate(10, "prueba", { h: 0, m: 0, s: 5 });
    let lista = this.cronoServ.getList();
    for (let i = this.indexRoutine; i < lista.length; i++) {
      let time = lista[i];
      this.cronoServ.updateTime(time.id, 'active');
      console.log(lista[i]);
      this.awaitT = await this.runTime(time.time.hours, time.time.minutes, time.time.seconds);
      this.cronoServ.updateTime(time.id, 'inactive');
    }
  }

  pause() {
    this.awaitT = undefined;
    this.pauseFlag = true;
    this.startFlag = false;
    clearInterval(this.interval);
    clearInterval(this.intervalMs);
  }

  pauseList() {
    this.awaitT = undefined;
    this.disabledFlag = true;
    clearInterval(this.interval);
    clearInterval(this.intervalMs);
  }

  restart() {
    this.hours = "0";
    this.minutes = "0";
    this.seconds = "0";
  }

  restartList() {
    this.pauseFlag = false;
    this.hours = "0";
    this.minutes = "0";
    this.seconds = "0";
    this.miliseconds = "0";
    clearInterval(this.interval);
    clearInterval(this.intervalMs);
    this.indexRoutine = 0;
    this.cronoServ.restartList();
  }

  runTime(ht: number, mt: number, st: number) {

    this.startFlag = true;
    this.disabledFlag = false;
    this.pauseFlag = false;
    let h = Number.parseInt(this.hours);
    let m = Number.parseInt(this.minutes);
    let s = Number.parseInt(this.seconds);
    let ms = 0;

    console.log('index routine', this.indexRoutine);

    return this.intervalSFn(h, m, s, ht, mt, st);

  }

  intervalMsFn(ms: number) {
    this.intervalMs = setInterval(() => {
      ms += 10;
      this.miliseconds = String(((ms == 1000) ? ms / 100 : ms / 10));
      if (ms == 1000) {
        ms = 0;
      }
    }, 1);
  }

  intervalSFn(h: number, m: number, s: number, ht: number, mt: number, st: number) {
    return new Promise((resolve) => {
      this.intervalMsFn(0);
      this.interval = setInterval(() => {
        s++
        this.seconds = String(((s == 60) ? 0 : s));
        if (s == 60) {
          s = 0;
          m++;
          this.minutes = String(((m == 60) ? 0 : m));
          if (m == 60) {
            m = 0;
            h++;
            this.hours = String(h);
          }
        }
        if (h == ht && m == mt && s == st) {
          this.indexRoutine++;
          this.miliseconds = "0";
          this.pauseList();
          //reproducimos el sonido
          this.soundPlayer();
          setTimeout(() => {
            this.restart();
            resolve();
          }, 3000);
        }
      }, 1000);
    });
  }

  soundPlayer(){
    this.player.nativeElement.play();
  }

  ngOnInit(): void {
  }

}
