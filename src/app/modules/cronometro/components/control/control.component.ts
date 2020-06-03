import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CronoServiceService } from '../../service/crono-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  @ViewChild('mensaje', { static: false }) msj: ElementRef;
  @ViewChild('done', { static: true }) btnDone: ElementRef;
  @ViewChild('break', { static: true }) slcBreak: ElementRef;

  public formGroup: FormGroup;
  public break: boolean;
  public comp: boolean[];

  constructor(
    private formBuilder: FormBuilder,
    public cronoServ: CronoServiceService,
    private renderer: Renderer2,
    private router : Router
  ) {
    //iniciamos el formulario
    this.formBuilderFn();
    //iniciamos los descansos como verdadero
    this.break = false;
  }

  ngOnInit(): void {
    this.compForm();
  }

  private formBuilderFn(): void {
    this.formGroup = this.formBuilder.group(
      {
        "title": ["", [Validators.required, Validators.maxLength(30)]],
        "hour": ["", [Validators.max(99)]],
        "minute": ["", [Validators.max(59)]],
        "second": ["", [Validators.required, Validators.min(0), Validators.max(59)]],
        "qty": ["", [Validators.required, Validators.min(1), Validators.max(60)]],
        "break": ["0", []],
        "titleB": [{ value: "break", disabled: true }, [Validators.required, , Validators.maxLength(20)]],
        "hourB": [{ value: "", disabled: true }, [Validators.max(99)]],
        "minuteB": [{ value: "", disabled: true }, [Validators.max(59)]],
        "secondB": [{ value: "", disabled: true }, [Validators.required, Validators.min(0), Validators.max(59)]]
      }
    );
  }

  breaksListen(event): void {
    if (event.target.value == 1) {
      this.getTitleB.enable();
      this.getHourB.enable();
      this.getMinuteB.enable();
      this.getSecondB.enable();
    } else {
      this.getTitleB.disable();
      this.getHourB.disable();
      this.getMinuteB.disable();
      this.getSecondB.disable();
    }
  }

  routineCreate() {
    this.formGroup.disable();
    this.btnDone.nativeElement.setAttribute('disabled', true);
    if (this.getBreak.value == 0) {
      this.cronoServ.routineCreate(this.getQty.value,
        this.getTitle.value,
        { h: this.getHour.value, m: this.getMinute.value, s: this.getSecond.value });
    } else {
      this.cronoServ.routineCreate(this.getQty.value,
        this.getTitle.value,
        { h: this.getHour.value, m: this.getMinute.value, s: this.getSecond.value },
        this.getTitleB.value,
        { h: this.getHourB.value, m: this.getMinuteB.value, s: this.getSecondB.value });
    }

  }

  //funcion para comprobar el estado del formulario y sus errores
  compForm() {
    this.formGroup.valueChanges.subscribe((form) => {
      // Mensaje de maximo 30 caracteres
      if (this.getTitle.hasError('maxlength')) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Mensaje de maximo 30 caracteres";
      }
      // Maximo 59 minutos, 59 segundos y 9 horas
      else if (this.getHour.hasError('max') || this.getMinute.hasError('max') || this.getSecond.hasError('max')) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Maximo 59 minutos, 59 segundos y 9 horas";
      }
      // Maximo 60 Intervalos
      else if (this.getQty.hasError('max')) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Maximo 60 Intervalos";
      }
      // Los campos titulo, segundos y cantidad son requeridos
      else if ((this.getSecond.hasError('required') && this.getSecond.dirty)
        || (this.getQty.hasError('required') && this.getQty.dirty)
        || (this.getTitle.hasError('required') && this.getTitle.dirty)) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Los campos titulo, segundos y cantidad son requeridos";
      }
      // Los campos titulo y segundos del descanso son requeridos
      else if ((this.getSecondB.hasError('required') && this.getSecondB.dirty)
        || (this.getTitleB.hasError('required') && this.getTitleB.dirty)) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Los campos titulo y segundos del descanso son requeridos";
      }
      // Campos segundos requeridos
      else if ((this.getSecond.hasError('required') && ((this.getHour.dirty) || (this.getMinute.dirty)))
        || (this.getSecondB.hasError('required') && ((this.getHourB.dirty) || (this.getMinuteB.dirty)))) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Los campos de segundo son requeridos";
      }
      // Tiempos en 0 (cero) no validos
      else if (((this.getHour.value == 0 && this.getMinute.value == 0 && this.getSecond.value == 0)
        && (this.getHour.dirty || this.getMinute.dirty || this.getSecond.dirty))) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Tiempos en 0 (cero) no validos";
        this.formGroup.setErrors(Validators.nullValidator);
      }
      // Tiempos en 0 (cero) no validos
      else if (((this.getHourB.value == 0 && this.getMinuteB.value == 0 && this.getSecondB.value == 0)
        && (this.getHourB.dirty || this.getMinuteB.dirty || this.getSecondB.dirty))) {
        this.msj.nativeElement.style.visibility = 'visible';
        this.msj.nativeElement.innerHTML = "Tiempos en 0 (cero) no validos";
        this.formGroup.setErrors(Validators.nullValidator);
      }
      else {
        this.msj.nativeElement.style.visibility = 'hidden';
        this.msj.nativeElement.innerHTML = "--";
      }
    });
  }

  newRoutine() {
    window.location.reload();
  }

  //gets form 
  get getTitle() {
    return this.formGroup.get("title");
  }
  get getHour() {
    return this.formGroup.get("hour");
  }
  get getMinute() {
    return this.formGroup.get("minute");
  }
  get getSecond() {
    return this.formGroup.get("second");
  }
  get getQty() {
    return this.formGroup.get("qty");
  }
  get getTitleB() {
    return this.formGroup.get("titleB");
  }
  get getHourB() {
    return this.formGroup.get("hourB");
  }
  get getMinuteB() {
    return this.formGroup.get("minuteB");
  }
  get getSecondB() {
    return this.formGroup.get("secondB");
  }
  get getBreak() {
    return this.formGroup.get("break");
  }
}
