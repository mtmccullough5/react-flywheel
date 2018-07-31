Flywheel Energy Storage Simulation Application

This application allows a user to build a hypothetical simple disk flywheel and then test its effects on the energy cost of a handful of building types.

How it Calculates:
  Flywheel energy storage is calculated based on radius, height, quantity, and with struture of a homogeneous block of steel.
  Building type is selected and pulls from a small data file with 24 hours of energy use for each.
  The plot displays the baseline energy use of the building type and also the simulation energy use.
  The simulation energy use reduces the max demand during the peak period and adds load evenly across off-peak hours.
  
Assumptions:
  Flywheel is treated as a solid disk
  Flywheel is made out of steel
  Building Types are located in San Francisco CA
  Building Baseline profiles are based on hourly energy use on June 1st
    
  
Proposed Features
  Multiple Materials
  Multi-part/complex flywheel geometry
  Seasonal average baseline energy use
  Adjustable Demand Schedule
  City selection for simulation types
  Real time pricing against CAISO and city selection
  
  Built using create-react-app

    Copyright (C) 2018  Matthew McCullough

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
