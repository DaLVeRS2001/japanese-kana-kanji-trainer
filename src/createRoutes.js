import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

export function createRoutes(modules) {
  const routesFromModules = modules.map((module) => module.getRoutes());
  return (
    <Routes>
      {routesFromModules}
      <Route path="/" element={<Navigate replace to="/trainer" />} />
    </Routes>
  );
}
