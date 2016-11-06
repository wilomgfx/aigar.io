package io.aigar.game

import com.github.jpbetz.subspace.Vector2
import io.aigar.game.serializable.Position
import io.aigar.game.Vector2Utils.StateAddon

object Virus {
  final val Quantity = 15
  final val Mass = 100
}

class Virus(var position: Vector2) {
  def update(grid: Grid, players: List[Player]): Unit = {
    val cell = detectCollisions(players)
     cell match {
      // TODO Add the virus consumption into the cell
      case Some(c: Cell) => respawn(grid, players)
      case _ =>
    }
  }

  def detectCollisions(players: List[Player]): Option[Cell] ={
    for(player <- players) {
      for(cell <- player.cells) {
        // TODO Change the 1.1 value to the constant
        if(cell.contains(position) && cell.mass > Virus.Mass * 1.1){
          return Some(cell)
        }
      }
    }
    None
  }

  def respawn(grid: Grid, players: List[Player]): Unit = {
    var newPosition = grid.randomPosition

    1 to 15 foreach { _ =>
      for (player <- players) {
        for (cell <- player.cells) {
          if (cell.contains(position))
            newPosition = grid.randomPosition
        }
      }
    }
    position = newPosition
  }

  def state: Position = {
    position.state
  }
}
