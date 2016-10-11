package io.aigar.game

import com.github.jpbetz.subspace._

class Player(val id: Int, startPosition: Vector2) {
  val cells = List(new Cell(startPosition))

  def update(deltaSeconds: Float) {
    cells.foreach { _.update(deltaSeconds) }
  }
}
