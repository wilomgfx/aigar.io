package io.aigar.game

import scala.math.round
import com.github.jpbetz.subspace._

class Player(val id: Int, startPosition: Vector2, grid: Grid) {
  var cells = List(new Cell(0, grid, startPosition))

  def update(deltaSeconds: Float) {
    cells.foreach { _.update(deltaSeconds) }
  }

  def state = {
    val mass = round(cells.map(_.mass).sum).toInt
    serializable.Player(id,
                        id.toString,
                        mass,
                        cells.map(_.state).toList)
  }

  /**
   * Should be called whenever an external action occurs (e.g. we receive a
   * command coming from the AI of a team).
   */
  def onExternalAction = {
    cells.foreach { _.behavior.onPlayerActivity }
  }
}
