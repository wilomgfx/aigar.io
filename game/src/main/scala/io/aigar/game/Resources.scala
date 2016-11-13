package io.aigar.game

import com.github.jpbetz.subspace.Vector2
import io.aigar.score.ScoreModification
import scala.collection.mutable.MutableList

object Regular {
  final val Max = 250
  final val Min = 100
  final val RespawnRetryAttempts = 10

  // IMPORTANT: keep those values in sync with the client documentation
  final val Mass = 1
  final val Score = 1
}

object Silver {
  final val Max = 25
  final val Min = 12
  final val RespawnRetryAttempts = 10

  // IMPORTANT: keep those values in sync with the client documentation
  final val Mass = 3
  final val Score = 3
}

object Gold {
  final val Max = 10
  final val Min = 5
  final val RespawnRetryAttempts = 10

  // IMPORTANT: keep those values in sync with the client documentation
  final val Mass = 0
  final val Score = 10
}

class Resources(grid: Grid) extends EntityContainer {
  var regulars = List.fill(Regular.Max)(new Regular(grid.randomPosition))
  var silvers = List.fill(Silver.Max)(new Silver(grid.randomPosition))
  var golds = List.fill(Gold.Max)(new Gold(grid.randomPosition))

  def update(grid: Grid, players: List[Player]): MutableList[ScoreModification] = {
    var scoreModifications = MutableList[ScoreModification]()
    regulars = handleCollision(regulars, players, Some(scoreModifications)).asInstanceOf[List[Regular]]
    silvers = handleCollision(silvers, players, Some(scoreModifications)).asInstanceOf[List[Silver]]
    golds = handleCollision(golds, players, Some(scoreModifications)).asInstanceOf[List[Gold]]

    if (shouldRespawn(regulars.size, Regular.Min)) {
      getRespawnPosition(grid, players, Regular.RespawnRetryAttempts) match {
        case Some(position) => regulars :::= List(new Regular(position))
        case _ =>
      }
    }

    if (shouldRespawn(silvers.size, Silver.Min)) {
      getRespawnPosition(grid, players, Silver.RespawnRetryAttempts) match {
        case Some(position) => silvers :::= List(new Silver(position))
        case _ =>
      }
    }

    if (shouldRespawn(golds.size, Gold.Min)) {
      getRespawnPosition(grid, players, Gold.RespawnRetryAttempts) match {
        case Some(position) => golds :::= List(new Gold(position))
        case _ =>
      }
    }
    scoreModifications
  }

  def onCellCollision(cell: Cell, player: Option[Player],  entity: Entity, scoreModifications: Option[MutableList[ScoreModification]]): List[Entity] = {
    scoreModifications.get += ScoreModification(player.get.id, entity.score)
    reward(cell, entity.mass)
    List(entity)
  }

  def reward(cell: Cell, mass: Float): Unit = {
    cell.mass += mass
  }

  def state: serializable.Resources = {
    serializable.Resources(
      regulars.map(_.state),
      silvers.map(_.state),
      golds.map(_.state)
    )
  }
}

class Regular(var position: Vector2 = new Vector2(0f, 0f)) extends Entity {
  _mass = Regular.Mass
  val score = Regular.Score

  def state: Vector2 = {
    position
  }
}

class Silver(var position: Vector2 = new Vector2(0f, 0f)) extends Entity {
  _mass = Silver.Mass
  val score = Silver.Score

  def state: Vector2 = {
    position
  }
}

class Gold(var position: Vector2 = new Vector2(0f, 0f)) extends Entity {
  _mass = Gold.Mass
  val score = Gold.Score

  def state: Vector2 = {
    position
  }
}
