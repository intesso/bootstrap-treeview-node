'use strict'

const expect = require('chai').expect
const dirtree = require('../lib/directory-tree')

describe('directoryTree', () => {

  it('should return an Object', () => {
    const tree = dirtree('./test/test_data', {include: ['.txt']})
    expect(tree).to.be.an('object')
  })

  it('should not include .files', () => {
    const tree = dirtree('./test/test_data/some_dir_2', {ignore: /^\./})
    expect(tree.nodes.length).to.equal(1)
  })

  it('should include .files', () => {
    const tree = dirtree('./test/test_data/some_dir_2')
    expect(tree.nodes.length).to.equal(2)
  })

  it('should list the children in a directory', () => {
    const tree = dirtree('./test/test_data', {include: ['.txt']})
    expect(tree.nodes.length).to.equal(4)
  })

  it('should display the size of a directory (summing up the children)', () => {
    const tree = dirtree('./test/test_data', {include: ['.txt']})
    expect(tree.size).to.be.above(11000)
  })
})
