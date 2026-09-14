import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import {
  projects,
  filterProjects,
  getProject,
  getNextProject,
  categories,
} from '../data/projects.ts';

test('Every case has a unique route, complete editable content and existing images', () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.equal(getProject(project.slug), project);
    assert.ok(categories.includes(project.category));
    for (const field of ['context', 'challenge', 'solution', 'results'] as const)
      assert.ok(project[field].length > 100);
    for (const src of [project.cover, ...project.screenshots.map((image) => image.src)])
      assert.ok(existsSync(`public${src}`), src);
  }
});
test('Filters preserve all matching projects and support an honest empty state', () => {
  assert.deepEqual(filterProjects('Todos'), projects);
  for (const category of categories.slice(1))
    assert.deepEqual(
      filterProjects(category),
      projects.filter((project) => project.category === category),
    );
  assert.deepEqual(filterProjects('Experimentos'), []);
});
test('Next-project navigation forms a complete cycle and rejects unknown slugs', () => {
  let project = projects[0];
  const visited = new Set<string>();
  for (let index = 0; index < projects.length; index++) {
    visited.add(project.slug);
    project = getNextProject(project.slug)!;
  }
  assert.equal(visited.size, projects.length);
  assert.equal(project.slug, projects[0].slug);
  assert.equal(getProject('does-not-exist'), undefined);
  assert.equal(getNextProject('does-not-exist'), undefined);
});
