<?php

/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Task[]|\Cake\Collection\CollectionInterface $tasks
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <?= $this->Html->link(__('Back'), ['action' => 'index'], ['class' => 'btn btn-primary text-light']) ?>
        </div>
    </aside>
    <div class="tasks index content text-light">
        <?= $this->Html->link(__('New Task'), ['action' => 'add'], ['class' => 'button float-right']) ?>
        <h3 class="text-center text-light"><?= __('Tasks') ?></h3>
        <div class="table-responsive col-md-12">
            <table>
                <thead>
                    <tr>
                        <th><?= $this->Paginator->sort('taskID') ?></th>
                        <th><?= $this->Paginator->sort('title') ?></th>
                        <th><?= $this->Paginator->sort('description') ?></th>
                        <th><?= $this->Paginator->sort('date') ?></th>
                        <th><?= $this->Paginator->sort('status') ?></th>
                        <th class="actions"><?= __('Actions') ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($tasks as $task): ?>
                    <tr>
                        <td><?= $this->Number->format($task->taskID) ?></td>
                        <td><?= h($task->title) ?></td>
                        <td><?= h($task->description) ?></td>
                        <td><?= h($task->date) ?></td>
                        <td><?= h($task->status) ?></td>
                        <td class="actions">
                            <?= $this->Html->link(__('View'), ['action' => 'view', $task->taskID]) ?>
                            <?= $this->Html->link(__('Edit'), ['action' => 'edit', $task->taskID]) ?>
                            <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $task->taskID], ['confirm' => __('Are you sure you want to delete # {0}?', $task->taskID)]) ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <div class="paginator">
            <ul class="pagination">
                <?= $this->Paginator->first('<< ' . __('first')) ?>
                <?= $this->Paginator->prev('< ' . __('previous')) ?>
                <?= $this->Paginator->numbers() ?>
                <?= $this->Paginator->next(__('next') . ' >') ?>
                <?= $this->Paginator->last(__('last') . ' >>') ?>
            </ul>
            <p><?= $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) ?></p>
        </div>
    </div>
</div>