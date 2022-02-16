<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Task $task
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h2 class="text-center heading"><?= __('Edit Tasks') ?></h2>
            <?= $this->Html->link(__('Back'), ['action' => 'index'], ['class' => 'btn btn-primary text-light']) ?>
            <?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $task->taskID],
                ['confirm' => __('Are you sure you want to delete # {0}?', $task->taskID), 'class' => 'side-nav-item']
            ) ?>
            <?= $this->Html->link(__('List Tasks'), ['action' => 'home'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="col-md-12 text-center">
        <div class="tasks form content">
            <?= $this->Form->create($task) ?>
            <fieldset class="mb-5" style="margin-left: 31%; padding-top:5%;">
                <!-- <legend><?= __('Edit Task') ?></legend> -->
                <?php
                    echo $this->Form->control('title');
                    echo $this->Form->control('description');
                    echo $this->Form->control('date', ['empty' => true]);
                    $options = ['PENDING', 'FAILED', 'COMPLETED'];
                    echo $this->Form->control('status', 
                    ['type' => 'select', 'options' => ['PENDING' => 'PENDING', 'FAILED' => 'FAILED', 'COMPLETED' => 'COMPLETED']]);
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
