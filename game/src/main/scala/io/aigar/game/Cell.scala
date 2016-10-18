package io.aigar.game

import io.aigar.game.Vector2Utils._
import com.github.jpbetz.subspace._

object Cell {
  /**
   * Force (in Newtons) applied when moving.
   */
  final val MovementForce = 10f

  /**
   * Default mass of a cell (at spawn).
   */
  final val MinMass = 1 // TODO determine this once we have visualization/etc.
}

class Cell(id: Int, startPosition: Vector2 = new Vector2(0f, 0f)) {
  var position = startPosition
  var target = startPosition
  var mass = Cell.MinMass
  var behavior: SteeringBehavior = new NoBehavior(this)
  private var _velocity = new Vector2(0f, 0f)

  /**
   * The maximum speed (length of the velocity) for the cell, in units per
   * second.
   */
  def maxSpeed = {
    15f //TODO depend on mass?
  }

  def velocity = _velocity
  def velocity_=(vel:Vector2) {
    _velocity = if (vel.magnitude < maxSpeed) vel else vel.normalize * maxSpeed
  }


  def update(deltaSeconds: Float) {
    target = behavior.update(deltaSeconds)

    velocity += acceleration * deltaSeconds
    position += velocity * deltaSeconds
  }

  def acceleration: Vector2 = {
    val dir = target - position
    val value = Cell.MovementForce / mass
    return if (dir.magnitude > 0) dir.normalize * value else new Vector2(0f,0f)
  }

  def state = {
    serializable.Cell(id,
                      mass,
                      position.state,
                      target.state)
  }
}