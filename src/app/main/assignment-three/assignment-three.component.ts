import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MapService } from 'src/app/services/map.service';
import { CustomPoint } from '../CustomPoint';

import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';

@Component({
  selector: 'app-assignment-three',
  templateUrl: './assignment-three.component.html',
  styleUrls: ['./assignment-three.component.scss'],
})
export class AssignmentThreeComponent implements OnInit {
  @ViewChild('mapPanel', { static: true })
  mapPanel!: ElementRef<HTMLDivElement>;

  constructor(public mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.createMap(this.mapPanel.nativeElement);
  }

  onLocate(point: CustomPoint) {
    // console.log('map locate: ', point);
    if (point) {
      this.mapService.mapView.graphics.removeAll();

      const pointMap = new Point({
        longitude: point.longitude,
        latitude: point.latitude,
      });

      const marker = new SimpleMarkerSymbol({
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      });

      const pointGraphic = new Graphic({
        geometry: pointMap,
        symbol: marker,
      });

      this.mapService.mapView.graphics.add(pointGraphic);
      this.mapService.mapView.goTo([pointMap.longitude, pointMap.latitude]);
      this.mapService.mapView.zoom = 15;
    }
  }
}
