import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';

import { MapService } from 'src/app/services/map.service';
import { CustomPoint } from '../CustomPoint';

import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';

import * as identify from '@arcgis/core/rest/identify.js';
import IdentifyParameters from '@arcgis/core/rest/support/IdentifyParameters.js';

import { LocatorComponent } from '../locator/locator.component';

@Component({
  selector: 'app-assignment-four',
  templateUrl: './assignment-four.component.html',
  styleUrls: ['./assignment-four.component.scss'],
})
export class AssignmentFourComponent implements OnInit, AfterViewInit {
  @ViewChild('mapPanel', { static: true })
  mapPanel!: ElementRef<HTMLDivElement>;

  @ViewChild(LocatorComponent) locator!: LocatorComponent;

  identifyURL =
    'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';
  params: any;

  divPanel = document.getElementById('map-panel');
  loading: boolean = false;

  constructor(public mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.createMap(this.mapPanel.nativeElement);

    // const layer = new MapImageLayer({
    //   url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
    // });

    const identifyLayer = new MapImageLayer({
      url: this.identifyURL,
      opacity: 0.5,
    });

    this.mapService.map.add(identifyLayer);

    this.mapService.mapView.center = [-99.3670125249, 39.9080133417];
    this.mapService.mapView.zoom = 5;
  }

  ngAfterViewInit(): void {
    this.mapService.mapView.on('click', (event: any) => {
      console.log(event);
      if (event.mapPoint) {
        // this.locator.location = {
        //   longitude: event.mapPoint.longitude,
        //   latitude: event.mapPoint.latitude,
        // };
        this.locator.location = event.mapPoint;

        console.log('mapPoint = ', event.mapPoint);
        this.executeIdentify(event.mapPoint);
      }
    });
  }

  onLocate(point: CustomPoint) {
    // console.log('map locate: ', point);
    // this.mapService.mapView.graphics.removeAll();
    if (point) {
      this.executeIdentify(point);
      // this.drawPoint(point);
    }
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  executeIdentify(mapPoint: any) {
    this.mapService.mapView.graphics.removeAll();
    this.loading = true;

    // identify
    this.params = new IdentifyParameters();
    this.params.tolerance = 3;
    this.params.layerIds = [3];
    this.params.layerOption = 'top';
    this.params.width = this.mapService.mapView.width;
    this.params.height = this.mapService.mapView.height;

    this.params.geometry = mapPoint;
    this.params.mapExtent = this.mapService.mapView.extent;
    this.params.returnGeometry = true;

    identify.identify(this.identifyURL, this.params).then((res) => {
      // console.log('res identify = ', res);
      this.loading = false;

      const results = res.results;

      let features = results.map((result: any) => {
        let feature = result.feature;
        const attr = feature.attributes;

        feature.popupTemplate = {
          title: attr['STATE_NAME'],
          content: `<b>Population (2007): </b>${this.numberWithCommas(
            attr['POP2007']
          )} <br>
            <b>Area: ${this.numberWithCommas(attr['Shape_Area'])}</b>
            `,
        };

        return feature;
      });

      this.mapService.mapView.popup.close();

      this.drawPoint({
        latitude: mapPoint.latitude,
        longitude: mapPoint.longitude,
      });

      if (features[0]?.geometry) {
        this.showPopup(features, mapPoint);
        this.drawPolygon(features);
      }
    });
  }

  showPopup(feature: any, mapPoint: any) {
    console.log('show popup = ', feature);
    // if (identify.length > 0) {
    this.mapService.mapView.popup.open({
      features: feature,
      location: mapPoint,
    });
    // }
  }

  drawPoint(point: any) {
    this.mapService.mapView.graphics.removeAll();

    // const pointMap = new Point({
    //   longitude: point.longitude,
    //   latitude: point.latitude,
    // });
    const pointMap = new Point({ ...point });

    console.log('point map = ', pointMap);

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
    this.mapService.mapView.zoom = 5;

    this.loading = false;
  }

  drawPolygon(features: any) {
    // this.mapService.mapView.graphics.removeAll();

    const polygon = new Polygon({
      rings: features[0].geometry.rings,
      spatialReference: features[0].geometry.spatialReference.wkid,
    });

    const fillSymbol = new SimpleFillSymbol({
      color: [153, 204, 255, 0.5],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [153, 204, 255],
        width: 1,
      },
      style: 'solid',
    });

    const areaGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol,
    });

    this.mapService.mapView.graphics.add(areaGraphic);
    this.mapService.mapView.graphics.reorder(areaGraphic, 0);
  }
}
