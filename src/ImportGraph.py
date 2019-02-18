import tensorflow as tf
import transform, numpy as np, vgg, pdb, os
import os

class ImportGraph():
    """  Importing and running isolated TF graph """
    def __init__(self, checkpoint_dir, device_t):
        # Create local graph and use it in the session
        self.graph = tf.Graph()
        soft_config = tf.ConfigProto(allow_soft_placement=True)
        soft_config.gpu_options.allow_growth = True
        self.sess = tf.Session(graph=self.graph, config=soft_config)
        with self.graph.as_default(), self.graph.device(device_t):
            batch_shape = (1,) + (256, 256, 3)
            self.img_placeholder = tf.placeholder(tf.float32, shape=batch_shape, name='img_placeholder')
            self.pred = transform.net(self.img_placeholder)

            # Import saved model from location 'checkpoint_dir' into local graph
            saver = tf.train.Saver()
            saver.restore(self.sess, checkpoint_dir)

    def run(self, X):
        return self.sess.run(self.pred, feed_dict={self.img_placeholder: X})