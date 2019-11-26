#!/usr/bin/env node

/**
 * Module dependencies.
 */
import Service from '../service';

export class Bootstrap{

  constructor(){
    const service:Service = new Service();
    service.start();
  }
}
new Bootstrap();