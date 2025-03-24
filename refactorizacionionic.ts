@Component({
  selector: 'app-p',
  templateUrl: './p.component.html',
})
export class PComponent implements OnInit {
  items: any[] = [];
  total = 0;
  carga = false;
  mensaje_estado = '';
  private readonly dataUrl = 'https://api.example.com/data';
  private readonly saveUrl = 'https://api.example.com/save';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.carga = true;
    this.httpClient.get(this.dataUrl).subscribe(
      (data: any[]) => {
        this.items = data;
        this.calcularTotal();
        this.carga = false;
      },
      (error) => {
        console.error('Error al cargar datos', error);
        this.mensaje_estado = 'Error al cargar datos';
        this.carga = false;
      }
    );
  }

  agregarItem(item: any): void {
    this.items.push(item);
    this.calcularTotal();
  }

  eliminarItem(index: number): void {
    this.items.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = 0;
    for (const item of this.items) {
      if (item.a === true) {
        this.total += item.p * item.q;
      }
    }
  }

  guardarDatos(): void {
    this.carga = true;
    this.httpClient.post(this.saveUrl, this.items).subscribe(
      () => {
        this.mensaje_estado = 'Guardado correctamente';
        this.carga = false;
      },
      (error) => {
        console.error('Error al guardar datos', error);
        this.mensaje_estado = 'Error al guardar';
        this.carga = false;
      }
    );
  }
}
